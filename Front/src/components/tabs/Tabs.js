import React, { useState } from "react"
import TabTitle from "./TabTitle"

const Tabs = (props) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="tabs">
      <ul className="tabs-headers">
        {props.children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            selected={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      {props.children[selectedTab]}
    </div>
  )
}

export default Tabs