import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/components/LoginForm";

export default function Login(isLoggedIn) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) router.push("/");  
    }, [isLoggedIn]);

    return (
        <main>
            <h1>Login</h1>
            <LoginForm />
        </main>
    );
}