import React, { useEffect } from "react";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Preview from "./../Preview/Preview";
import Resizable from "./../Resizable/Resizable";
import { Cell } from "./../../store";
import { createBundle } from "./../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { updateCell } from "./../../store";
import useCumulativeContent from "./../../hooks/useCumulativeContent";
import "./CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector((state) => state.bundles[cell.id]);
  const cumulativeContent = useCumulativeContent(cell.id);

  useEffect(() => {
    if (!bundle) {
      dispatch(createBundle({ cellId: cell.id, rawCode: cumulativeContent }));
      return;
    }

    const compileTimer = setTimeout(async () => {
      dispatch(createBundle({ cellId: cell.id, rawCode: cumulativeContent }));
    }, 750);

    return () => {
      clearTimeout(compileTimer);
    };
    //eslint-disable-next-line
  }, [cell.id, cumulativeContent, dispatch]);

  return (
    <div className="code-editor">
      <Resizable direction="vertical">
        <div className="code-editor-inner-wrapper">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue={cell.content}
              onCurrentValue={(value: string) =>
                dispatch(updateCell({ id: cell.id, content: value }))
              }
            />
          </Resizable>
          {!bundle || bundle.loading ? (
            <div className="progress-outer-wrapper">
              <div className="progress-wrapper">
                <progress className="progress is-small is-primary" max="100">
                  loading
                </progress>
              </div>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingError={bundle.err} />
          )}
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
