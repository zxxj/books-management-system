// 图书类型
export interface IBook {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

// 图书列表查询条件
export interface QueryParams {
  name: string;
}

// ModalProps
export interface ICreateModalProps {
  visible: boolean;
  handleClose: Function;
  bookId?: number;
}

export interface IUpdateModalProps {
  visible: boolean;
  handleClose: Function;
  bookId?: number;
  setRandom: (random: number) => void;
}
