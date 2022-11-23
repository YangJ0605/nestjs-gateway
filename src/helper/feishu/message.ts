import { BusinessException, BUSINESS_ERROR_CODE } from 'src/common/exceptions';
import { methodV } from 'src/utils/request';

export enum RECEIVE_TYPE {
  'open_id',
  'user_id',
  'union_id',
  'email',
  'chat_id',
}

export enum MSG_TYPE {
  text,
  post,
  image,
  file,
  audio,
  media,
  sticker,
  interactive,
  share_chat,
  share_user,
}

type MESSAGES_PARAMS = {
  receive_id: string;
  content: string;
  msg_type: MSG_TYPE;
};

export const messages = async (
  receive_id_type: RECEIVE_TYPE,
  params: MESSAGES_PARAMS,
  app_token: string,
) => {
  try {
    const { data } = await methodV({
      url: `/im/v1/messages`,
      method: 'POST',
      query: { receive_id_type },
      params,
      headers: {
        Authorization: `Bearer ${app_token}`,
      },
    });
    return data;
  } catch (error) {
    throw new BusinessException({
      message: error?.response?.data?.msg || '调用飞书api失败',
      code: error?.response.data?.code || BUSINESS_ERROR_CODE.COMMON,
    });
  }
};
