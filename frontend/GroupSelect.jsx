import React from "react";
import "./css/GroupSelect.css";

/**
 * @param {Object} [props = {}]
 * @param {function(string):undefined} [props.onChange = (()=>{})] - function to call when the value of this element changes.
 *   Passes the new value as the first parameter
 * @param {Array<GroupInfo>} [props.groupInfo = []] - list of groups to display
 * @returns {React.Component}
 */

export default function GroupSelect({
  onChange,
  groupInfo = [],
} = {}) {
  return (
    <select onChange={(event) => onChange(event.target.value)} defaultValue="">
      <option value="" disabled>
        Select a group to display
      </option>
      {groupInfo.map((info) => {
        return (
          <option key={info.id} value={info.id}>
            {info.label}
          </option>
        );
      })}
    </select>
  );
}
