import { useAppSelector } from "./hook";

const useCumulativeContent = (cellId: string) => {
  return useAppSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
    import _React from "react";
    import _ReactDOM from "react-dom/client";

      var show =(value)=>{
        const root = document.getElementById("root")

        if(typeof value === 'object'){
          if(value.$$typeof && value.props){
            _ReactDOM.createRoot(root).render(value);
          }else{
            root.innerHTML = JSON.stringify(value)
          }
        }
        else{
          root.innerHTML =value
        }
      }
    `;

    var showFuncNoOperation = `var show = ()=>{}`;

    const contents: string[] = [];

    for (let currentCell of orderedCells) {
      if (currentCell.type === "code") {
        if (currentCell.id === cellId) {
          contents.push(showFunc);
        } else {
          contents.push(showFuncNoOperation);
        }
        contents.push(currentCell.content);
      }
      if (currentCell.id === cellId) {
        break;
      }
    }

    return contents.join("\n");
  });
};

export default useCumulativeContent;
