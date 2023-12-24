import Image from "next/image"
import styles from '../styles/About.module.css'


export default function About() {
    return (
        <div className={styles.about}>
            <h1>Sobre o projeto</h1>
            <p>Este site foi criado com o intuito sobre aprender sobre o Next.js</p>
            <p>
                <a href="https://www.youtube.com/playlist?list=PLnDvRpP8BnezfJcfiClWskFOLODeqI_Ft" target="_blank">Playlist utilizada</a>
            </p>
            <Image
                src='/images/charizard.png'
                width={300}
                height={300}
                alt="Charizard"
            />
        </div>
    )
}