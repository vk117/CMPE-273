export default function LogInDetails(payload) {
    return {
        type: "CHECK_INFO",
        username: payload.username,
        password: payload.password,
        uname: payload.uname      }
}