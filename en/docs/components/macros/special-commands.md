!!! abstract "Overview"
    
    This section provides a list of the special commands you can use in a **Macro Template** and an explanation for them.

| Command | Description | Usage example |
| ------- | ----------- | ------------- |
| `<sleep x>` | Pauses the execution of the macro for `x` seconds. | "Blinking" a port, i.e. turning it off, waiting for some time and turning it back on. |
| `<exception "error_message">` | Throws an exception with the `error_message`. | Error checking, i.e. the macro is for an ONU, but a user is trying to apply it to a different type of interace. |
| `<cr>` | Double ++enter++. | Some device models, like `Huawei MA56xx/MA58xx`, could require for an additional ++enter++ key press for confirmation. |
| `<prompt="text">` | Wait for the specified prompt (text) instead of the device's standard prompt. | A command produces a non-standard prompt that must be awaited before continuing. |
| `<confirm="answer">` | Run the command and automatically send the given answer (e.g. `y`) in response to a confirmation request. | A command always asks for confirmation, e.g. `Continue? [y/n]`. |
| `<confirm-if="answer","prompt">` | Send the answer only if the device shows the specified prompt; otherwise continue without waiting. | A confirmation may or may not appear (e.g. `Are you sure?`) — prevents the macro from hanging. |
| `<stream_timeout=x>` | Temporarily extend the response wait time to `x` seconds (fractions allowed, e.g. `1.5`) for this command; the previous value is restored afterwards. | Slow commands that take a long time to produce output (e.g. large tables). |