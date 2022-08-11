import { FC } from "react";
import { ICartNews } from "lib/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Moment from "react-moment";
import { UseLoadImg } from "lib/hooks/load-img";
import noImage from "images/no-image.png";

export const CartNews: FC<ICartNews> = (props) => {
  const { author, title, description, url, urlToImage, publishedAt, source } =
    props;

  const { image } = UseLoadImg(urlToImage || "", noImage);

  return (
    <article className='w-full max-w-[500px] flex flex-col items-center'>
      <header className='flex flex-col w-full border-b-2 mb-4'>
        <a href={url} className='block w-full text-center'>
          <h3 className='text-xl text-left mb-2 mt-4 font-bold'>{title}</h3>
        </a>
        <Moment
          className='ml-auto mt-auto text-sm text-slate-500'
          format='MM/DD/YYYY h:mm'
        >
          {publishedAt}
        </Moment>
      </header>
      <figure className='flex h-full flex-col'>
        <LazyLoadImage
          className='mx-auto block h-[300px] mb-[20px] max-h-full object-cover'
          width={500}
          height={300}
          alt={title}
          src={image}
        ></LazyLoadImage>
        <figcaption
          className=''
          dangerouslySetInnerHTML={{ __html: description }}
        ></figcaption>
      </figure>
      <footer className='mt-4 text-sm flex w-full'>
        <p className='ml-auto'>
          <span>автор:</span> {author || "Неизвестно"}
        </p>
        <p className='ml-4'>
          <span>©</span> {source.name || "Неизвестно"}
        </p>
      </footer>
    </article>
  );
};
