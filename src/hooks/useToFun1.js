import { setCurrEl } from "./useCurrEl"

function useToFun1(router) {
  return function () {
    router.replace("/fun1");
    setCurrEl(1);
  }
}

export default useToFun1