## Types of module data(OLTs)

### Interface 
<pre><code>type Interface struct {
    Name   string `json:"name,omitempty"`
    Parent int    `json:"parent,omitempty"`
    ID     int    `json:"id,omitempty"`
    Type   string `json:"type,omitempty"`
    OnuNum int    `json:"onu_num,omitempty"`
} `json:"interface,omitempty"`
</code></pre>

### Vendor 
```
Vendor struct {
    Vendor      string `json:"vendor"`
    Model       string `json:"model"`
    ModelID     string `json:"model_id"`
    OmccVersion string `json:"omcc_version"`
    Versions    *[]struct { 
        ImageNum  int    `json:"image_num"`
        Version   string `json:"version"`
        Active    bool   `json:"active"`
        Valid     bool   `json:"valid"`
        Committed bool   `json:"committed"`
    } `json:"versions,omitempty"` 
    VerSoftware any `json:"ver_software"`
    VerHardware any `json:"ver_hardware"`
} `json:"vendor"`
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
Reasons struct {
    HistoryTable *[]struct {
        DownReason string `json:"down_reason"`
        DeregTime  string `json:"dereg_time"`
        RegTime    string `json:"reg_time"`
        RegSince   any    `json:"reg_since"`
        DeregSince any    `json:"dereg_since"`
    } `json:"history_table"`
    LastReg         string `json:"last_reg"`
    LastRegSince    any    `json:"last_reg_since"`
    LastDereg       string `json:"last_dereg"`
    LastChange      any    `json:"last_change"`
    LastDeregSince  any    `json:"last_dereg_since"`
    LastDownReason  string `json:"last_down_reason"`
    LastChangeSince any    `json:"last_change_since"`
} `json:"reasons"
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
```
### UNI interface info
In diagnostic - returns always as array of objects  
``` 
Uni []struct {
    Num        string `json:"num"`
    Status     string `json:"status"`
    AdminState string `json:"admin_state"`
    ID         int    `json:"id"`
    Name       string `json:"name"`
    Mode       string `json:"mode"`
    Pvid       string `json:"pvid"`
    TrunkVlans string `json:"trunk_vlans"`
} `json:"uni"`
```

### UNI interface info (ZTE)
``` 
Uni []struct {
    Num          string `json:"num"`
    Speed        string `json:"speed"`
    Status       string `json:"status"`
    AdminState   string `json:"admin_state"`
    AdminSpeed   string `json:"admin_speed"`
    PowerControl string `json:"power_control"`
} `json:"uni"`
```

 
### FDB table 
```cpp 
Fdb         []struct {
    VirtualPort int    `json:"_virtual_port"`
    VlanID      int    `json:"vlan_id"`
    MacAddress  string `json:"mac_address"`
    Uni         any    `json:"uni"`
    Status      any    `json:"status"`
} `json:"fdb"`
```
### Configuration (ZTE)
```
Configuration struct {
    Type           string `json:"type"`
    State          string `json:"state"`
    Password       string `json:"password"`
    CurrentChannel string `json:"current_channel"`
    AuthMode       string `json:"auth_mode"`
    SnBind         string `json:"sn_bind"`
    VportMode      string `json:"vport_mode"`
    DbaMode        string `json:"dba_mode"`
    LineProfile    string `json:"line_profile"`
    ServiceProfile string `json:"service_profile"`
    OnlineDuration string `json:"online_duration"`
    Fec            string `json:"fec"`
    FecActualMode  string `json:"fec_actual_mode"`
    Pps1Tod        string `json:"pps1_tod"`
    AutoReplace    string `json:"auto_replace"`
    McastEncrypt   string `json:"mcast_encrypt"`
    TypeConfigured *string    `json:"type_configured"`
    TypeReported   *string    `json:"type_reported"`
    AuthInfo       *string    `json:"auth_info"`
} `json:"configuration"`
```

### GPON profiles for BDcom 
```
type Profiles      struct {
    Vlan []struct {
        ID         int    `json:"id"`
        Name       string `json:"name"`
        Mode       string `json:"mode"`
        Pvid       string `json:"pvid"`
        TrunkVlans string `json:"trunk_vlans"`
    } `json:"vlan"`
    Tcont []struct {
        ID   int    `json:"id"`
        Name string `json:"name"`
        Type string `json:"type"`
    } `json:"tcont"`
    Flow []struct {
        ID   int    `json:"id"`
        Name string `json:"name"`
    } `json:"flow"`
    Uniport []struct {
        ID   int    `json:"id"`
        Name string `json:"name"`
    } `json:"uniport"`
} `json:"profiles"` 
```

### Profiles (ZTE)
```
Profiles struct {
    Line    []string `json:"line"`
    Remote  []string `json:"remote"`
    Traffic []string `json:"traffic"`
    EponSLA []string `json:"epon_sla"`
} `json:"profiles"`
```

## Types of module data (switch)

### Interface (General)
```
Interface struct {
    ID   string `json:"id"`
    Name string `json:"name"`
    Key  string `json:"_key"`
    Type string `json:"type"`
} `json:"interface"`
```

### Interface (Huawei)
``` 
Interface struct {
    ID         int    `json:"id"`
    Name       string `json:"name"`
    PhysicalID string `json:"_physical_id"`
    SnmpID     string `json:"_snmp_id"`
    Type       string `json:"_type"`
    Shelf      string `json:"_shelf"`
    Slot       string `json:"_slot"`
    Port       string `json:"_port"`
} `json:"interface"`
```

### FDB 
```
Fdb []struct {
    VlanID     string `json:"vlan_id"`
    Status     string `json:"status"`
    MacAddress string `json:"mac_address"`
} `json:"fdb"`
```

### Link info (Dlink)
```
LinkInfo []struct {
    MediumType       string `json:"medium_type"`
    Type             string `json:"type"`
    LastChange       string `json:"last_change"`
    ConnectorPresent any    `json:"connector_present"`
    OperStatus       string `json:"oper_status"`
    Description      string `json:"description"`
    AdminState       string `json:"admin_state"`
    NwayStatus       string `json:"nway_status"`
    AddressLearning  any    `json:"address_learning"`
} `json:"link_info"`
```

### Link info (Huawei)
```
LinkInfo []struct {
    OperStatus string `json:"oper_status"`
    NwayStatus string `json:"nway_status"`
    AdminState string `json:"admin_state"`
    LastChange string `json:"last_change"`
    MediumType any    `json:"medium_type"`
    Type       string `json:"type"`
} `json:"link_info"`
```

### Errors 
```
Errors struct {
    InErrors    string `json:"in_errors"`
    OutErrors   string `json:"out_errors"`
    InDiscards  string `json:"in_discards"`
    OutDiscards string `json:"out_discards"`
} `json:"errors"`
```

### Cable diagnostic (Dlink)
```
CableDiag struct {
    Pairs []struct {
        Number int    `json:"number"`
        Status string `json:"status"`
        Length int    `json:"length"`
    } `json:"pairs"`
} `json:"cable_diag"`
```
### Cable diagnostic (Huawei)
```
CableDiag struct {
    Status string `json:"status"`
    Length string `json:"length"`
} `json:"cable_diag"`
```

### Counters 
```
Counters struct {
    InOctets         string `json:"in_octets"`
    OutOctets        string `json:"out_octets"`
    OutMulticastPkts string `json:"out_multicast_pkts"`
    InMulticastPkts  string `json:"in_multicast_pkts"`
    OutBroadcastPkts string `json:"out_broadcast_pkts"`
    InBroadcastPkts  string `json:"in_broadcast_pkts"`
} `json:"counters"`
```

### Description 
```
Description struct {
    Description string `json:"description"`
} `json:"description"`
```

### Vlans 
```
Vlans []struct {
		ID   string `json:"id"`
		Name string `json:"name"`
		Type string `json:"type"`
	} `json:"vlans"`
}
```

 