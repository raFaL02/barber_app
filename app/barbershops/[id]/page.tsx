import { db } from "@/app/_lib/prisma";
import BarbershoInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarberShopDetailsPageProps {
    params: {
        id?: string;
    };
}

const BarberShopDetailsPage = async ({params}: BarberShopDetailsPageProps) => {
    const session = await getServerSession(authOptions);

    if(!params.id) {
        // TODO: redirecionar para homepage
        return null
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true
        },
    });

    if(!barbershop) {
        return null;
    }
    return (
        <div>
            <BarbershoInfo barbershop={barbershop} />

            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user}/>
                ))}
            </div>

        
        </div>
    )
};
 
export default BarberShopDetailsPage;