export const commonResponseData = (data: any) => {
  return {
    code: 0,
    data: data,
  };
};

export const commonResponseDataList = (dataList: any[]) => {
  return {
    code: 0,
    dataList: dataList,
  };
};

export const commonResponseError = (code: number, msg: string = "") => {
  return {
    code: code,
    msg,
  };
};
