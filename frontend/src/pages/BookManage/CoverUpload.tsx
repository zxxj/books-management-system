import { DraggerProps, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

interface CoverUploadProps {
  value?: string;
  onChange?: Function;
}

const url = 'http://localhost:3000';
let onchange: Function;

const props: DraggerProps = {
  name: 'file',
  action: `${url}/book/upload`,
  method: 'post',
  onChange(info) {
    const { status } = info.file;

    if (status === 'done') {
      onchange(info.file.response);
      message.success(`${info.file.name}文件上传`);
    } else if (status === 'error') {
      message.error(`${info.file.name}文件上传失败`);
    }
  },
};

const dragger = (
  <Dragger {...props}>
    <p className="">
      <InboxOutlined />
    </p>

    <p>点击或拖拽上传文件</p>
  </Dragger>
);

export const CoverUpload = (props: CoverUploadProps) => {
  onchange = props.onChange!;

  return props?.value ? (
    <div>
      <img src={`${url}/${props.value}`} alt="封面" width={100} height={100} />
      {dragger}
    </div>
  ) : (
    <div>{dragger}</div>
  );
};
