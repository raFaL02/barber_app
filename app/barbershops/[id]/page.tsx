import { db } from "@/app/_lib/prisma";
import BarbershoInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";

interface BarberShopDetailsPageProps {
    params: {
        id?: string;
    };
}

const BarberShopDetailsPage = async ({params}: BarberShopDetailsPageProps) => {
    if(!params.id) {
        // TODO: redirecionar para homepage
        return null
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            service: true
        },
    });

    if(!barbershop) {
        return null;
    }
    return (
        <div>
            <BarbershoInfo barbershop={barbershop} />

            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.service.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                ))}
            </div>

        
        </div>
    )
};
 
export default BarberShopDetailsPage;