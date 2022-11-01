import { useState, useEffect } from 'react';
import ControlBar from '@/lib/components/Core/ControlBar';
import Logo from '@/lib/components/Core/Logo';
import { Product } from '@/lib/types/product';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@mantine/core';

function Products() {
  const [product, setProduct] = useState<Product>();
  const [clickedReadMore, setClickedReadMore] = useState(false);
  const [orderCount, setOrderCount] = useState(1);
  const router = useRouter();
  const { id } = router.query;
  const MAX_CHARACTERS = 135;
  let isMaxCharacters = false;
  useEffect(() => {
    console.log(id);
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);
  function addOrderCount() {
    setOrderCount((oldCount) => oldCount + 1);
  }
  function subractOrderCount() {
    if (orderCount > 1) {
      setOrderCount((oldCount) => oldCount - 1);
    }
  }
  if (product?.description && product?.description.length > MAX_CHARACTERS) {
    isMaxCharacters = true;
  }
  console.log(product);
  return (
    <>
      <ControlBar />
      <Logo />
      <div className="flex flex-col w-full m-3 lg:flex-row">
        <div>
          <Image
            src={product?.image ? product.image : ''}
            alt={product?.description ? product.description : ''}
            className="w-full h-60 object-contain"
            width={250}
            height={250}
          />
        </div>
        <div className="my-3 flex flex-col">
          <div className="w-full flex justify-between my-4">
            <p className="mr-auto">Seller name</p>
            <p className="mr-1">Listed on: 11-1-2022</p>
          </div>
          <h1 className="text-xl font-bold">{product?.title}</h1>
          <p className="capitalize text-zinc-500">{product?.category}</p>
          <p className="my-10 order-4 md:order-5">
            {!isMaxCharacters && <>{product?.description}</>}
            {!clickedReadMore && isMaxCharacters && (
              <>
                {product?.description.substring(0, MAX_CHARACTERS) + '...'}{' '}
                <button className="text-blue-500" onClick={() => setClickedReadMore(true)}>
                  Read More
                </button>
              </>
            )}
            {clickedReadMore && isMaxCharacters && (
              <>
                {product?.description + ' '}
                <button className="text-blue-500" onClick={() => setClickedReadMore(false)}>
                  Read Less
                </button>
              </>
            )}
          </p>
          <div
            className={`${
              clickedReadMore && 'shadow-[0px_0px_12px_rgba(0,0,0,0.12)]'
            } mr-1 order-5 md:order-4 py-3`}
          >
            <p className="font-bold text-2xl text-right mb-3">$ {product?.price}</p>
            <div className="flex">
              <div className="w-[40%] flex">
                <div
                  className="p-3 px-5 md:px-8 bg-zinc-100 rounded-l-lg border border-zinc-200 text-zinc-500"
                  onClick={addOrderCount}
                >
                  +
                </div>
                <div className="p-3 px-5 md:px-10 lg:px-10 border border-zinc-200 text-zinc-500">
                  {orderCount}
                </div>
                <div
                  className="p-3 px-5 md:px-8 bg-zinc-100 rounded-r-lg border border-zinc-200 text-zinc-500"
                  onClick={subractOrderCount}
                >
                  -
                </div>
              </div>
              <Button className="w-[60%] bg-brown-600" size="lg">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Products;
