## Types of data for BDcom (GPON) 

### Interface (by diag method)
<pre><code>type Interface struct {
    Name   string `json:"name,omitempty"`
    Parent int    `json:"parent,omitempty"`
    ID     int    `json:"id,omitempty"`
    Type   string `json:"type,omitempty"`
    OnuNum int    `json:"onu_num,omitempty"`
} `json:"interface,omitempty"`
</code>
</pre>

### Vendor 
```
type Vendor struct {
    Model       string `json:"model,omitempty"`
    Vendor      string `json:"vendor,omitempty"`
    VerHardware string `json:"ver_hardware,omitempty"`
    VerSoftware string `json:"ver_software,omitempty"`
    Versions    string `json:"versions,omitempty"`
    OmccVersion string `json:"omcc_version,omitempty"`
    ModelID     string `json:"model_id,omitempty"`
} `json:"vendor,omitempty"`
```

### ONT Status 
```
type Status struct {
    OnuDisabled any    `json:"_onu_disabled,omitempty"`
    Online      string `json:"online,omitempty"`
    Bind        any    `json:"bind,omitempty"`
    Admin       string `json:"admin,omitempty"`
    ConfStatus  any    `json:"_conf_status,omitempty"`
} `json:"status,omitempty"`
```

### ONT Ident  (MAC-address/serial)
```
type Ident  struct {
    Value string `json:"value,omitempty"`
    Type  string `json:"type,omitempty"`
} `json:"ident,omitempty"`
```

### Reasons  
```
type Reasons struct {
    HistoryTable   []interface{} `json:"history_table,omitempty"`
    LastReg        string `json:"last_reg,omitempty"`
    LastRegSince   string `json:"last_reg_since,omitempty"`
    LastDereg      string `json:"last_dereg,omitempty"`
    LastChange     string `json:"last_change,omitempty"`
    LastDeregSince string `json:"last_dereg_since,omitempty"`
    LastDownReason string `json:"last_down_reason,omitempty"`
} `json:"reasons,omitempty"`
```

### Counters 
```
type Counters struct {
    InErrors         any `json:"in_errors,omitempty"`
    OutErrors        any `json:"out_errors,omitempty"`
    InDiscards       any `json:"in_discards,omitempty"`
    OutDiscards      any `json:"out_discards,omitempty"`
    InOctets         any `json:"in_octets,omitempty"`
    OutOctets        any `json:"out_octets,omitempty"`
    InMulticastPkts  any `json:"in_multicast_pkts,omitempty"`
    OutMulticastPkts any `json:"out_multicast_pkts,omitempty"`
    InBroadcastPkts  any `json:"in_broadcast_pkts,omitempty"`
    OutBroadcastPkts any `json:"out_broadcast_pkts,omitempty"`
} `json:"counters,omitempty"`
```
### Optical info
```
Optical struct {
    OltRx    *float64 `json:"olt_rx,omitempty"`
    OltTx    *float64 `json:"olt_tx,omitempty"`
    Rx       *float64 `json:"rx,omitempty"`
    Tx       *float64 `json:"tx,omitempty"`
    Voltage  *float64 `json:"voltage,omitempty"`
    Temp     *float64 `json:"temp,omitempty"`
    Distance *float64 `json:"distance,omitempty"`
} `json:"optical,omitempty"`
Configuration any `json:"configuration,omitempty"`
Profiles      any `json:"profiles,omitempty"`
```