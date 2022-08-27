import { Modal } from "components/modal";
import { useDispatch } from "lib/hooks";
import { TEvent } from "lib/types";
import { useState } from "react";
import { getKeyApi } from "store/slices/key-api";

export const ModalKeyApi = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");

  const handlerValue = ({ target }: TEvent) => {
    setValue(target.value);
  };

  const handlerSubmit = () => {
    dispatch(getKeyApi(value));
  };

  return (
    <Modal>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='flex flex-col justify-center items-center p-10 bg-white h-48 w-96 rounded'
      >
        <p>
          Введите ключ с сайта -
          <a href='https://newsapi.org/' target={"_blank"} rel='noreferrer'>
            newsapi.org
          </a>
        </p>
        <input
          className='border mt-4 w-full'
          type='text'
          value={value}
          onChange={handlerValue}
        />
        <button
          className='border rounded-md mt-4 py-1 px-4'
          onSubmit={handlerSubmit}
          type='submit'
        >
          Отправить
        </button>
      </form>
    </Modal>
  );
};
