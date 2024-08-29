
import { User } from "@/models/userModels";
import { hash } from "bcryptjs";
import { redirect} from "next/navigation";
import { connectToDb } from "./dbConnect";
import { signIn } from "@/auth"; // Adjust the import based on your setup
import { NextResponse } from "next/server";
import { CredentialsSignin } from "next-auth";

export const Login = async (email:string, password:string) => {
    "use server"
        try {
        const result = await signIn("credentials", {
            redirect:false,
            email,
            password,
        });

    } catch (err:any) {
        const error = err as CredentialsSignin;
        return err;
    }
}

export const SignUp = async(formData:any)=>{
    "use server"
    const name =formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string;
    if(!email || !password || !name){
        throw new Error("Invalid credentials");
    }
    else{
        await connectToDb();
        const user = await User.findOne({email});
        if(user) throw new Error("User already exists");
        const hashedPassword = await hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        })
        redirect("/login")
    }}
