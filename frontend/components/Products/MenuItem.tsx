import { Product } from "../../types/Product";

export default function MenuItem(props: { item: Product }) {
    const { item } = props;

    return (
        <div className="menu-item px-2">
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col items-center justify-between">
                <div className="aspect-w-4 aspect-h-3 w-full max-w-[200px] mx-auto mb-4 hover:animate-pop">
                    <img
                        loading="lazy"
                        src={process.env.NEXT_PUBLIC_DOMAIN + item.images[0]}
                        alt={item.name}
                        className="object-contain w-full h-full rounded-lg"
                        onError={(e) => {
                            e.currentTarget.src = `${process.env.NEXT_PUBLIC_DOMAIN}uploads/default_coffee.png`;
                        }}
                    />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-2 truncate w-full text-center">{item.name}</h3>
                <p className="text-gray-700 mb-4 text-xs text-center font-thin truncate w-full">{item.description}</p>
                <span className="text-base font-bold">${item.price}</span>
            </div>
        </div>
    )
}