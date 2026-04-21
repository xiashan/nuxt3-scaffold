class CAbortController {
  abortCtrl: AbortController;
  constructor() {
    this.abortCtrl = new AbortController();
  }
  abort(reason?: string) {
    this.abortCtrl.abort(reason);
    this.abortCtrl = new AbortController();
    // do nothing
  }
}

export const useAbortController = () => {
  const abortController = new CAbortController();
  return {
    abortController,
  };
};
