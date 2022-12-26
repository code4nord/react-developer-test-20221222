import * as React from "react"
import * as Table from "@mui/material/Table";
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type Props = {
  user: User,
  fetchData: (user: User) => void
}

export const User = ({ user, fetchData }: Props) => {

  return (
    <div className="user">
      <div>
        {user.timestamp}
        {user.diff}
      </div>
    </div>)
}