"use client";

import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Film } from "lucide-react";
import Image from "next/image";

import { toast } from 'react-hot-toast';
import styles from "../../app/dashboard/dashboard.module.css";

export default function MediaUpload({ mediaUrls = [], onUpdate }) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const newUrls = [];

        try {
            for (const file of files) {
                console.log("📤 Uploading file:", file.name);

                // Use unsigned upload with preset (no signature/timestamp needed!)
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "products_unsigned");
                formData.append("folder", "products");

                console.log("☁️ Uploading to Cloudinary with unsigned preset...");
                const uploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await uploadRes.json();

                if (!uploadRes.ok) {
                    throw new Error(data.error?.message || "Upload failed");
                }

                console.log("✅ Uploaded successfully:", data.secure_url);
                newUrls.push(data.secure_url);
            }

            onUpdate([...mediaUrls, ...newUrls]);
            toast.success("Media uploaded!");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to upload image/video");
        } finally {
            setUploading(false);
        }
    };

    const removeMedia = (indexToRemove) => {
        const newUrls = mediaUrls.filter((_, index) => index !== indexToRemove);
        onUpdate(newUrls);
    };

    const isVideo = (url) => {
        return url.match(/\.(mp4|webm|ogg|mov)$/i);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                {mediaUrls.map((url, index) => (
                    <div key={url || index} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#f9fafb' }}>
                        {isVideo(url) ? (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
                                <Film color="#fff" size={24} />
                            </div>
                        ) : (
                            <Image src={url} alt="" fill style={{ objectFit: 'cover' }} />
                        )}
                        <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: 'rgba(255,0,0,0.8)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0
                            }}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}

                <label style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '8px',
                    border: '2px dashed #d1d5db',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: uploading ? 'wait' : 'pointer',
                    color: '#6b7280',
                    background: uploading ? '#f3f4f6' : 'transparent'
                }}>
                    {uploading ? <Loader2 size={24} className={styles.spin} /> : <Upload size={24} />}
                    <span style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>{uploading ? 'Uploading...' : 'Add Media'}</span>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        disabled={uploading}
                    />
                </label>
            </div>

        </div>
    );
}
