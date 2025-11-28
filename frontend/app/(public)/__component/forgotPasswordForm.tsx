"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ModeToggle } from "@/app/components/toggle-mode";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { forgotPassword } from "@/app/service/auth";


const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail")                // quando estiver vazio
    .email("Informe um e-mail válido"),          // quando formato estiver errado
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });


    const onSubmit = async (data: ForgotPasswordFormData) => {
        try{
            const response = await forgotPassword({ email: data.email })
            if(!response.success){
                toast.error(response.message || "Erro ao recuperar senha. ER-05")
                return
            }
            
        }catch(error){
            toast.error("Erro ao recuperar senha. ER-05")
        }
    };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background relative px-4">
      {/* Toggle de tema no canto superior direito */}
      <div className="absolute top-4 right-4 cursor-pointer">
        <ModeToggle />
      </div>

      {/* Conteúdo principal: logo em cima + form embaixo */}
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {/* Logo */}
        <div className="w-full flex justify-center">
          <Image
            src="/images/logo-meu-gerente.png"
            alt="Meu Gerente"
            width={260}
            height={260}
            className="w-40 h-auto sm:w-52 md:w-60 object-contain"
            priority
          />
        </div>

        {/* Formulário de "Esqueci minha senha" */}
        <Card className="w-full shadow-lg border-border">
          <form onSubmit={handleSubmit(onSubmit)} >
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Esqueci minha senha
              </CardTitle>
              <CardDescription>
                Informe seu e-mail para receber o link de redefinição de senha.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* E-mail */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  {...register("email")}
                />
                 {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full mt-2 cursor-pointer"
              >
                Enviar
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 text-xs text-muted-foreground items-center">
              <div>
                Lembrou a senha?
                <a
                  href="/login"
                  className="text-primary hover:underline ml-1 cursor-pointer"
                >
                  Voltar ao login
                </a>
              </div>
              <div>
                Não tem conta?
                <a
                  href="/register"
                  className="text-primary hover:underline ml-1 cursor-pointer"
                >
                  Criar conta
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
