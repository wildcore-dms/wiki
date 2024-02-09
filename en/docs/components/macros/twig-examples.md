# Twig template examples

!!! info "Overview"
    This page presents basic **Macros** submitted by our users, along with explanations. 
    
    Feel free to copy and try them out!

!!! danger "Warning"
    Be cautious when running the code on your devices.

!!! warning "Attention"
    Commands may vary depending on your setup. 
    
    Refer to your device's manual for applicable commands.


## Changing the client's speed limit

### **Common tab**

!!! quote ""
    1. **Name:** `Change client's speed limit`
    2. **Description:** *feel free to enter a descriptive overview of this macro*
    3. **Roles:** *feel free to select ****Roles**** appropriate to run this macro*
    4. **Model vendors filter:** for the purpose of this demonstration we use the vendor `ZTE`
    5. **Models:** `[ZTE C300 (FW 1.2), ZTE C320 (FW 1.2), ZTE C320]`
    6. **Displaye for:** `ONU`
    7. **Display output:** `All commands`

### **Parameters tab**

!!! quote ""
    1. Add a new **Parameter**.
    2. **Property:** `speed`
    3. **Property display name:** : `Speed`
    4. **Required:** *feel free to set this checkbox as you wish*
    5. **Parameter type:** `Dropdown list from predefined`

        Here we use predefined values to help the user choose the right one conveniently.
    6. **Predefined values list:**
        ```
        100MB
        1GB
        ```
    7. **Visibility condition:** *feel free to fill this out appropriately for your setup*

### **Template tab**

!!! quote ""
    1. **Device** and **Interface:** *feel free to select a **Device** and an **Interface** applicable to this macro*
    2. **Parameters form:** Here's the dropdown for the **Speed** property from the previous tab.
    3. **Variables:** Here are the variables from the selected **Device** and **Interface**.
    4. **Template block:**

        - **Chosen template:** This is the input field that defines your macro, the specific CLI command that are run on the selected **Device** and/or **Interface**, combined with **Parameters** you chose.

            ```
            conf t
            interface {{iface.name}}
            tcont 1 name T-INET profile UP-{{params.speed}}
            gemport 1 traffic-limit downstream DOWN-{{params.speed}}
            end
            wr
            ```

        - **Live result:** Here you can see the result of this **Template**'s compilation, the exact command that will run on your hardware. 

            !!! danger "" 
                Be sure to check every **Template** before using on a real **Device**!

            ```
            // For the purpose of this demonstration 
            // we selected the Speed of 100MB 
            // in the dropdown above
            // and a device with Interface g0/0

            conf t
            interface g0/0  // Our {{iface.name}} variable became the g0/0 port for example, 
                            // which we selected in the Device and Interface dropdowns

            tcont 1 name T-INET profile UP-100MB    // Here you can see {{params.speed}} 
                                                    // became the value we selected in the Speed parameter dropdown

            gemport 1 traffic-limit downstream DOWN-100MB   // Same here
            end
            wr

            // The other static commands have been left unchanged
            ```

The macro is now ready to use

Navigate to a device and an interface applicable for this macro and find the macro we just created in the **Macros** tab.

!!! tip 
    Since we selected `ONU` at the **Display for** step, the macro will only be visible on the appropriate sreen.

    For this demonstration, we selected a `ZTE 320` **Device** and it's `epon-onu_1/1/1:1` **Interface**.

    ![](../../assets/macros/twig_examples_onu_screen.png)

    As you can see we can select **Speed** from the drop-down, for the user to set, and have a few buttons.

    When you press the **Preview** button, you can see the same result as in the **Live preview** of the macro creation **Template** tab.
    
    ![](../../assets/macros/twig_examples_preview_executed_commands.png)

    !!! danger ""
        Always be careful about running any macros on live hardware.


    The **Execute** button behaves as expected, it sends the commands to the device's interface, in this case `epon-onu_1/1/1:1`.

    !!! warning ""
        We will not actually **Execute** the macro in this demonstration for safety purposes.

        You can see some successfull macro executions in the next sections of this page.

##