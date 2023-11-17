'use client';

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import format from "@lib/formatters";
import type { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@components/ui/Skeleton";
import useCart from "@app/cart/hook";
import Button from "@components/ui/Button";

export default function Product({ params }: { params: { id: string } }) {
	const [product, setProduct] = useState<Product | undefined>(undefined);

	useEffect(() => {
		const searchParams = new URLSearchParams();
		searchParams.set('id', params.id);
		
		fetch(`/api/products?${searchParams.toString()}`)
			.then(res => res.json())
			.then(setProduct)
			.catch(notFound)
	}, []);

	return <>
		<Preview />
		<Details />
		<Actions />
	</>

	function Preview() {
		return product
			? <Image
				className="h-60 w-full rounded bg-white object-contain"
				width={200}
				height={200}
				alt={product.name}
				src={`data:image/jpeg;base64,${product.icon}`}
			/>
			: <Skeleton className="h-60 w-full rounded" />
	}
	
	function Details() {
		return <>
			<div className="mx-8 mt-5 flex items-center justify-between">
				{ product
					? <>
						<h1 className="font-semibold">{product.name}</h1>
						<h2 className="ml-2">{format.brl(product.price)}</h2>
					</>
					: <>
						<Skeleton className="h-11 w-44"/>
						<Skeleton className="ml-2 h-8 w-24"/>
					</>
				}
			</div>
			{ product
				? (
					<p className="mx-7 my-5 min-h-[5rem] max-h-40 font-light break-words overflow-hidden">
						{product.description}
					</p>
				)
				: <Skeleton className="mx-7 my-5 min-h-[5rem] max-h-40 w-[calc(100%-3.5rem)]" />
			}
		</>
	}

	function Actions() {
		const router = useRouter();
	
		const [quantity, setQuantity] = useState(1);
		const { addItemToCart } = useCart();
	
		const handleBtnClick = () => {
			addItemToCart({
				product: {
					...product!,
				},
				quantity,
			});
	
			router.push("/cart");
		};
	
		return (
			<div className="flex w-full justify-around">
				<div className="flex flex-row items-center">
					{ product
						? <>
							<Button
								className="h-7 w-7 border-[1px] border-solid border-white bg-transparent text-white"
								onClick={() => setQuantity((n) => (n == 1 ? n : n - 1))}
								placeholder="-"
							/>
							<p className="mx-3 text-lg">{quantity}</p>
							<Button
								className="h-7 w-7"
								onClick={() => setQuantity((n) => (n == 15 ? n : n + 1))}
								placeholder="+"
							/>
						</>
						: <>
							<Skeleton className="h-7 w-7" />
							<div className="mx-3"><Skeleton className="h-5 w-[10px] rounded-sm" /></div>
							<Skeleton className="h-7 w-7" />
						</>
					
					}
				</div>
	
				{ product
					? (
						<Button
							onClick={handleBtnClick}
							className="w-40"
							placeholder="Adicionar ao Carrinho"
						/>
					)
					: <Skeleton className="h-10 w-40" />
				}
			</div>
		);
	}
}

