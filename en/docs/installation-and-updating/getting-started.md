
# Getting started

!!! abstract "Overview"
    This page provides an overview of the **WildcoreDMS** onboarding process, from installation to running it.

!!! warning "Note"
    At the moment, the only way to install the **WildcoreDMS** is through our custom `wca-tool`, using **Docker**.

!!! warning "Note"
    Prior to installation, ensure that your system meets the [System requirements](./requirements.md).

## Registration

!!! info
    This section will take you through the registration process. Feel free to skip it if you have already set up an account.

1. Go to the [Registration page](https://cabinet.wildcore.tools/auth/Registration).

    ![](../assets/onboarding/registration_empty.png)

2. Fill out the **Name**, **Company name**, **Email address** and **Password** fields, accept the  [Terms and Conditions](https://wildcore.tools/public-offer-agreement.pdf) and press the **Registration** button.

    ![](../assets/onboarding/registration_filled_out.png)

3. Confirm your registration.

    Please verify your registration by checking the email inbox you provided. In a few minutes, an email from `noreply@wildcore.tools` should arrive.
    
    !!! tip
        If you experience delays, kindly check your **Spam** folder.

    Once received, please press the **Confirm Email** button inside the email.

    ![](../assets/onboarding/confirm_email.png)

4. Log in with your email and password.

    ![](../assets/onboarding/registration_confirmed.png)

## Creating an Agent

1. Log in into your personal **Cabinet**.

    ![](../assets/onboarding/cabinet.png)

2. Activate your Trial Agent.

    Press the **Activate TRIAL** button in the **Active agents** panel, read the pop-up carefully and agree to it.

    ![](../assets/onboarding/activate_trial.png)

    Your first trial **Agent** is now active.

    ![](../assets/onboarding/active_agents.png)


## Installation

1. Install the latest version of the `wca-tool`.

    ```shell linenums="1"
    sudo curl -L "https://releases.wildcore.tools/wca-tool/latest/wca-tool-$(uname -s)-$(uname -m)" -o /usr/local/bin/wca-tool && sudo chmod +x /usr/local/bin/wca-tool
    ```

2. Find your Agent key in the **Agents** tab in your **Cabinet**.

    ![](../assets/onboarding/agents_agent_key.png)

3. Run the following command to install the **WildcoreDMS**.

    ```shell linenums="1"
    sudo wca-tool --key=YOUR_AGENT_KEY install 
    ```

!!! note
    The installation process may take some time (usually about 10-15 minutes)

If the installation was successful, the following message will be displayed:

```{ .shell .no-copy }
    WildcoreDMS (version x.xx.x) success installed!
    Now, you can use wildcoreDMS by URL: http://<service ip|domain>:8088
    Default login/password - admin/admin

    You can change some parameters in /opt/wildcore-dms/.env file, as listen ports for example
```

After installation, you can navigate to the **Web Panel**.

!!! tip
    The panel is available at `http://localhost:8088` by default.

You will be greeted by the **WildcoreDMS** login screen.

![](../assets/onboarding/wildcore_login.png)

!!! tip
    The default login credentials are:

    - **Username:** `admin`
    - **Password:** `admin`

 