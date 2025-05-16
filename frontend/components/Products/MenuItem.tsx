import { Product } from "@/types/Product";

export default function MenuItem(props: { item: Product }) {
    const { item } = props;

    return (
        <div className="menu-item px-2">
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col items-center justify-between">
                <img
                    src={process.env.NEXT_PUBLIC_DOMAIN + item.images[0]}
                    alt={item.name}
                    className="w-full max-w-[200px] h-32 mx-auto object-contain rounded-lg mb-4 hover:animate-pop"
                    onError={(e) => {
                        e.currentTarget.src = `${process.env.NEXT_PUBLIC_DOMAIN}uploads/default_coffee.png`; // path to your fallback image
                    }}
                />
                <h3 className="text-sm md:text-base font-semibold mb-2 truncate w-full text-center">{item.name}</h3>
                <p className="text-gray-700 mb-4 text-xs font-thin truncate w-full">{item.description}</p>
                <span className="text-base font-bold">${item.price}</span>
            </div>
        </div>
    )
}