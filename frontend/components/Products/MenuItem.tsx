import { Product } from "../../types/Product";

export default function MenuItem(props: { item: Product }) {
    const { item } = props;

    return (
        <div className="menu-item px-2">
            <div className="bg-cabin-200/80 p-4 rounded-xl shadow hover:shadow-lg transition h-full flex flex-col items-center justify-between">
                <div className="aspect-w-4 aspect-h-3 bg-light_latte min-h-40 sm:w-32 object-contain max-w-[200px] mx-auto mb-4 hover:animate-pop rounded-3xl">
                    <img
                        loading="lazy"
                        src={process.env.NEXT_PUBLIC_DOMAIN + item.images[0]}
                        alt={item.name}
                        className="object-cover w-full h-full rounded-3xl"
                        onError={(e) => {
                            e.currentTarget.src = `${process.env.NEXT_PUBLIC_DOMAIN}uploads/default_coffee.png`;
                        }}
                    />
                </div>
                <div className="flex flex-col items-center justify-end gap-2 w-full">
                    <h3 className="text-base text-espresso-800 md:text-base font-semibold mb-2 truncate w-full text-center">{item.name}</h3>
                    <p className="text-espresso-800 mb-4 text-xs text-center font-thin truncate w-full">{item.description}</p>
                    <span className="text-base font-bold text-espresso-800 font-mono">${item.price}</span>
                </div>
            </div>
        </div>
    )
}