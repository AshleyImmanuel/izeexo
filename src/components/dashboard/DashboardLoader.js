import styles from "./DashboardLoader.module.css";
import Image from "next/image";

export default function DashboardLoader({ text = "SYNCING..." }) {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.logoWrapper}>
                <Image
                    src="/logo.jpg"
                    alt="Loading"
                    width={48}
                    height={48}
                    className={styles.logo}
                />
                <div className={styles.ripple}></div>
                <div className={styles.ripple}></div>
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    );
}
