## Type of data 
Objects represented in Golang format

### ApiSuccessResponse
```cpp linenums="1"
type ApiSuccessResponse struct {
	StatusCode int                `json:"statusCode,omitempty"`
	Meta       interface{}        `json:"meta,omitempty"`
	Data       <a href="#diagnosticresponse" >DiagnosticResponse</a> `json:"data,omitempty"`
}
```
### DiagnosticResponse
```cpp linenums="1"
type DiagnosticResponse struct {
    Iface <a href="#deviceinterface">DeviceInterface</a>  `json:"iface,omitempty"`
    Diagnostic struct {
        Data map[string]interface{} `json:"data,omitempty"` // <a href="./../module_responses">See modules in responses</a>
        Meta map[string]<a href="#metadiagnostic">MetaDiagnostic</a> `json:"meta,omitempty"`
    } `json:"diagnostic,omitempty"`
    DeviceStatus struct {
        Data <a href="#system-device-module">SystemData</a> `json:"data,omitempty"`
        Error *string `json:"error,omitempty"`
    } `json:"device_status,omitempty"`
} 
```

### MetaDiagnostic
```cpp linenums="1"
type MetaDiagnostic struct {
	Time      string `json:"time"`
	Source    string `json:"source"`
	FromCache bool   `json:"from_cache"`
	Hash      string `json:"hash"`
	Error     *string    `json:"error"`
	DeviceIP  string `json:"device_ip"`
}
```


### DeviceInterface
```cpp linenums="1"
type DeviceInterface struct {
    CreatedAt     string                       `json:"created_at,omitempty"`
    UpdatedAt     string                       `json:"updated_at,omitempty"`
    Device        <a href="#device">Device</a> `json:"device"`
    BindKey       string                       `json:"bind_key,omitempty"`
    Name          string                       `json:"name,omitempty"`
    Type          string                       `json:"type,omitempty"`
    Params        *map[string]interface{}      `json:"params,omitempty"`
    BillingLink   string                       `json:"billing_link,omitempty"`
    IP            string                       `json:"ip,omitempty"`
    Agreement     string                       `json:"agreement,omitempty"`
    Description   string                       `json:"description,omitempty"`
    Status        string                       `json:"status,omitempty"`
    PollEnabled   bool                         `json:"poll_enabled,omitempty"`
    ParentBindKey string                       `json:"parent_bind_key,omitempty"`
    Coordinates   map[string]interface{}       `json:"coordinates,omitempty"`
    Comment       string                       `json:"comment,omitempty"`
    ID            int                          `json:"id,omitempty"`
}
```

### Device
```cpp linenums="1"
type Device  struct {
    IP                  string                 `json:"ip,omitempty"`
    Location            string                 `json:"location,omitempty"`
    Name                string                 `json:"name,omitempty"`
    Description         string                 `json:"description,omitempty"`
    Model               <a href="#devicemodel">DeviceModel</a>            `json:"model,omitempty"`
    Access              <a href="#deviceaccess">DeviceAccess</a>           `json:"access,omitempty"`
    Params              map[string]interface{} `json:"params,omitempty"`
    UpdatedAt           string                 `json:"updated_at,omitempty"`
    CreatedAt           string                 `json:"created_at,omitempty"`
    Mac                 string                 `json:"mac,omitempty"`
    Serial              string                 `json:"serial,omitempty"`
    Group     struct {
        CreatedAt   string                     `json:"created_at,omitempty"`
        Name        string                     `json:"name,omitempty"`
        Description string                     `json:"description,omitempty"`
        ID          int                        `json:"id,omitempty"`
    }                                          `json:"group,omitempty"`
    Pollers     any                            `json:"pollers,omitempty"`
    Coordinates any                            `json:"coordinates,omitempty"`
    Enabled     bool                           `json:"enabled,omitempty"`
    ID          int                            `json:"id,omitempty"`
} 
```

### DeviceModel
```cpp linenums="1"
type DeviceModel struct {
    Name        string                  `json:"name,omitempty"`
    Key         string                  `json:"key,omitempty"`
    Params      map[string]interface{}  `json:"params,omitempty"`
    Vendor      string                  `json:"vendor,omitempty"`
    Model       string                  `json:"model,omitempty"`
    Type        string                  `json:"type,omitempty"`
    Controller  string                  `json:"controller,omitempty"`
    Pollers     map[string]int          `json:"pollers,omitempty"`
    Icon        string                  `json:"icon,omitempty"`
    ID          int                     `json:"id,omitempty"`
} 
```

### DeviceAccess
```cpp linenums="1"
type DeviceAccess struct {
    Params map[string]interface{} `json:"params,omitempty"`
    Name string                   `json:"name,omitempty"`
    ID   int                      `json:"id,omitempty"`
}
```


### System (Device module)
```cpp linenums="1"
type ModuleDataSystem struct {
    Descr            string `json:"descr,omitempty"`
    Uptime           string `json:"uptime,omitempty"`
    UptimeSec        string `json:"uptime_sec,omitempty"`
    Contact          string `json:"contact,omitempty"`
    Name             string `json:"name,omitempty"`
    Location         string `json:"location,omitempty"`
    MacAddr          string `json:"mac_addr,omitempty"`
    VendorName       string `json:"vendor_name,omitempty"`
    SerialNum        string `json:"serial_num,omitempty"`
    BoardSoftwareVer string `json:"board_software_ver,omitempty"`
    BoardHardwareVer string `json:"board_hardware_ver,omitempty"`
    Meta             struct {
        Key    string `json:"key,omitempty"`
        Name   string `json:"name,omitempty"`
        Detect struct {
            Description string `json:"description,omitempty"`
            Objid       string `json:"objid,omitempty"`
            IfacesCount int    `json:"ifacesCount,omitempty"`
        } `json:"detect,omitempty"`
        Ports int `json:"ports,omitempty"`
        Extra struct {
            PonPortSize                 int      `json:"pon_port_size,omitempty"`
            ConsoleConnType             string   `json:"console_conn_type,omitempty"`
            ConsoleCommandsAfterConnect []string `json:"console_commands_after_connect,omitempty"`
            Interfaces                  []struct {
                Name    string `json:"name,omitempty"`
                ID      int    `json:"id,omitempty"`
                Xid     int    `json:"xid,omitempty"`
                Type    string `json:"type,omitempty"`
                Pontype string `json:"pontype,omitempty"`
            } `json:"interfaces,omitempty"`
        } `json:"extra,omitempty"`
        Modules []string `json:"modules,omitempty"`
    } `json:"meta,omitempty"`
} `json:"data,omitempty"`
```