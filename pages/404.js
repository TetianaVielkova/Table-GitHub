import Image from "next/image";
import BackHomeBtn from "../components/BackHomeBtn/BackHomeBtn";

export default function Custom404() {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center",   alignItems: "center",}}>
            <Image src="/images/404.jpg" width={900} height={500} alt="404 - Page Not Found"/>
            <h1 style={{marginBottom: '40px'}}>404 - Page Not Found</h1>
            <BackHomeBtn/>
        </div>
    )
}