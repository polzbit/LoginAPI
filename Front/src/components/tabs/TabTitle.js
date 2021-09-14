import React, { useCallback, useState } from "react"

const TabTitle = (props) => {
    const { index, title, setSelectedTab , selected} = props;

    const onClick = useCallback(() => {
        setSelectedTab(index)
    }, [setSelectedTab, index])

  return (
    <li className="tab-head">
      <button className={selected == index ? "tab-btn tab-active" :"tab-btn"} onClick={onClick}>{title}</button>
    </li>
  )
}

export default TabTitle