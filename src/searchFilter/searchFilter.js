import React, { useState, useCallback, useEffect } from "react";
import { itemList } from "../data";
import "./searchFilter.css";

const SearchFilter = () => {
  const [filter, setFilter] = useState("");
  const [chosedItems, setChosedItems] = useState([]);
  const [dropDownList, setDropDownList] = useState(false);
  const [isHighlighted] = useState("isHighlighted");
  const [cursor, setCursor] = useState(0);

  const keyFunction = useCallback(
    (event) => {
      switch (event.keyCode) {
        case 27:
          setDropDownList(false);
          break;
        case 38:
          setCursor((c) => (c > 0 ? c - 1 : 0));
          break;
        case 40:
          setCursor((c) => (c < filtredItems.length - 1 ? c + 1 : c));
          break;
        default:
          return;
      }
    },
    [setCursor, setChosedItems]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyFunction, false);

    return () => {
      document.removeEventListener("keydown", keyFunction, false);
    };
  }, [keyFunction, setCursor]);

  const filtredItems = itemList.filter((item) => {
    return item.toLowerCase().includes(filter.toLowerCase());
  });

  const inputFilter = (value) => {
    setFilter(value);
    setDropDownList(true);
  };

  const dropDownListToggle = () => {
    setDropDownList(!dropDownList);
  };

  const onChoseItem = (item) => {
    if (!chosedItems.includes(item)) {
      setChosedItems([...chosedItems, item]);
    }
    setFilter("");
  };

  const deleteItem = (el) => {
    setChosedItems(chosedItems.filter((current) => current !== el));
  };

  return (
    <div className="filter">
      <div className="inputFilter">
        {chosedItems.map((fi, idx) => (
          <button key={idx} className="chosedItems">
            {fi}
            <a onClick={() => deleteItem(fi)}>
              <span className="delElemItem">&#215;</span>
            </a>
          </button>
        ))}
        <input
          value={filter}
          onClick={dropDownListToggle}
          type="text"
          className="myInput"
          onChange={(e) => inputFilter(e.target.value)}
          placeholder="Search for names.."
        />
        <button onClick={dropDownListToggle} className="dropdownbutton">
          <a> &#9660; </a>
        </button>
      </div>

      {dropDownList && (
        <ul className="listItem">
          {filtredItems.map((c, idx) => {
            return (
              <li key={idx}>
                <a
                  className={`listItemlink ${
                    idx === cursor ? isHighlighted : ""
                  }`}
                  href="#"
                  onClick={() => onChoseItem(c)}
                >
                  {c}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchFilter;
