import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { list } from '../../api/book';
import type { IBook } from './types';
import { RenderBookCard } from './RenderBookCard';
import { renderSearch } from './RenderSearch';

export const BookMange = () => {
  const [bookList, setBookList] = useState<Array<IBook>>([]); // 图书列表.
  const [queryParams, setQueryParams] = useState<string>(); // 图书列表查询条件.
  const [random, setRandom] = useState<number>(0); // 随机数,在编辑或更新图书时用来刷新图书列表.

  // 获取图书列表.
  const listBook = async () => {
    try {
      const { data } = await list(queryParams);
      setBookList(data);
    } catch (error) {
      console.log('图书列表获取失败!');
    }
  };

  useEffect(() => {
    listBook();
  }, [queryParams, random]);

  return (
    <div className="flex justify-center h-screen w-screen overflow-hidden bg-[url('/background.png')] bg-cover bg-center">
      <div className="w-11/12 h-auto mt-10 mb-10">
        <Card className="w-full h-full">
          {/* 查询区域 */}
          {renderSearch(setQueryParams, setRandom)}

          {/* 图书列表徐区域 */}
          <div
            className="flex flex-wrap justify-between overflow-y-auto"
            style={{ height: '700px' }}
          >
            {bookList.map((item) => (
              <RenderBookCard book={item} setRandom={setRandom} key={item.id} />
            ))}

            {/* 处理flex布局justify-spacebetwwen中间留白问题 */}
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
            <div className="h-0 w-72"></div>
          </div>
        </Card>
      </div>
    </div>
  );
};
