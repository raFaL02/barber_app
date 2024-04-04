"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { CalendarDays, CircleUserIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

const SideMenu = () => {
    
    const { data } = useSession();

    const handleLogoutCLick = () => signOut();

    const handleLoginClick = () => signIn("google");
    return ( 
        <>

        <SheetHeader className="text-left border-b border-solid border-secondery p-5">
            <SheetTitle>Menu</SheetTitle>
        </SheetHeader>


        {data?.user ? (
            <div className="flex justify-between px-5 py-6 items-center">
                <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                </Avatar>

                <h2 className="font-bold">{data.user.name}</h2>
            </div>

            <Button variant="secondary" size="icon">
                <LogOutIcon onClick={handleLogoutCLick} />
            </Button>
            </div>
        ) : (
            <div className="flex flex-col px-5 py-6 gap-2">
                <div className="flex items-center gap-3">
                    <CircleUserIcon className="text-gray-400" size={32} />
                    <h2 className="font-bold">Olá, faça seu login!</h2>
                </div>

                <Button variant="secondary" className="w-full justify-start" onClick={handleLoginClick}>
                    <LogInIcon className="mr-2" size={18}/>
                    Fazer Login
                </Button>
            </div>
        )}
        <div className="flex flex-col gap-3 px-5">
            <Button variant="outline" className="justify-start" asChild>
                <Link href="/">
                    <HomeIcon size={18} className="mr-2"/>
                    Início
                </Link>
            </Button>

            {data?.user && (

                <Button variant="outline" className="justify-start" asChild>
                    <Link href="/bookings">
                        <CalendarDays size={18} className="mr-2"/>
                        Agendamento
                    </Link>
                </Button>
            )}
        </div>
        </>
     );
}
 
export default SideMenu;