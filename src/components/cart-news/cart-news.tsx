import { FC } from 'react';
import { ICartNews } from 'lib/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Moment from 'react-moment';
import noImage from 'images/no-image.png';

export const CartNews: FC<ICartNews> = (props) => {
  const { author, title, description, url, urlToImage, publishedAt, source } = props;

  return (
    <article className='w-full max-w-[500px] flex flex-col items-center'>
      <header className='flex flex-col w-full border-b-2 mb-4'>
        <a href={url} className='block w-full text-center'>
          <h3 className='text-xl mb-2 mt-4 font-bold'>{title}</h3>
        </a>
        <Moment className='ml-auto text-sm text-slate-500' format='MM/DD/YYYY h:mm'>
          {publishedAt}
        </Moment>
      </header>
      <figure className='flex h-full flex-col'>
        <LazyLoadImage className='mx-auto block mb-[20px] max-h-full h-full object-scale-down' width={500} alt={title} src={urlToImage || noImage}></LazyLoadImage>
        <figcaption className='mt-auto' dangerouslySetInnerHTML={{ __html: description }}></figcaption>
      </figure>
      <header className='mt-4 text-sm flex w-full'>
        <p className='ml-auto'>
          <span>автор:</span> {author || 'неизвестно'}
        </p>
        <p className='ml-4'>
          <span>оригинал:</span> {source.name || 'неизвестно'}
        </p>
      </header>
    </article>
  );
};
