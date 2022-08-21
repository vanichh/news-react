import { FC, useState } from "react";
import { ICartNews } from "lib/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Moment from "react-moment";
import { UseLoadImg } from "lib/hooks/load-img";
import noImage from "images/no-image.png";
import cn from "classnames";

export const CartNews: FC<ICartNews> = (props) => {
  const { author, title, description, url, urlToImage, publishedAt, source } =
    props;

  const [isShowBtn, setIsShowBtn] = useState(false);
  const { image } = UseLoadImg(urlToImage || "", noImage);

  return (
    <article
      onMouseEnter={() => setIsShowBtn(true)}
      onMouseLeave={() => setIsShowBtn(false)}
      className={cn(
        "w-full max-w-[500px] flex hover:cursor-pointer flex-col items-center"
      )}
    >
      <header className='flex flex-col w-full border-b-2 mb-4'>
        <a
          href={url}
          target='_blank'
          rel='noreferrer'
          className='block w-full text-center'
        >
          <h3 className='text-xl text-left mb-2 mt-4 font-bold'>{title}</h3>
        </a>
        <Moment
          className='ml-auto mt-auto text-sm text-slate-500'
          format='MM/DD/YYYY h:mm'
          children={publishedAt}
        />
      </header>
      <figure className={cn("flex h-full flex-col")}>
        <div className='relative'>
          <LazyLoadImage
            className={cn(
              "mx-auto block transition-[filter] h-[300px] mb-[20px] max-h-full object-cover",
              {
                "blur-sm": isShowBtn,
              }
            )}
            width={500}
            height={300}
            alt={title}
            src={image}
          />
          <a
            href={url}
            rel='noreferrer'
            target='_blank'
            className={cn(
              `opacity-0 transition-[opacity] absolute top-2/4 left-2/4 
              right-0 bottom-0 translate-x-[-50%] translate-y-[-50%] blur-none
               bg-slate-600 text-white w-fit px-4 h-fit rounded py-2`,
              {
                "!opacity-100": isShowBtn,
              }
            )}
          >
            Читать в источнике
          </a>
        </div>
        <figcaption
          className=''
          dangerouslySetInnerHTML={{ __html: description }}
        />
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
