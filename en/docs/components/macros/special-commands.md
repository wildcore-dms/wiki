!!! abstract "Overview"
    
    This section provides a list of the special commands you can use in a **Macro Template** and an explanation for them.

| Command | Description | Usage example |
| ------- | ----------- | ------------- |
| `<sleep x>` | Pauses the execution of the macro for `x` seconds. | "Blinking" a port, i.e. turning it off, waiting for some time and turning it back on. |
| `<exception "error_message">` | Throws an exception with the `error_message`. | Error checking, i.e. the macro is for an ONU, but a user is trying to apply it to a different type of interace. |
| `<cr>` | Double ++enter++. | Some device models, like `Huawei MA56xx/MA58xx`, could require for an additional ++enter++ key press for confirmation. |