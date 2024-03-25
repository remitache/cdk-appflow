/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { ConnectorAuthenticationType } from '../core/connectors/connector-authentication-type';
import { ConnectorProfileBase, ConnectorProfileProps } from '../core/connectors/connector-profile';
import { CfnConnectorProfile } from "aws-cdk-lib/aws-appflow";
import { Construct } from "constructs";
import { MailChimpConnectorType } from "./type";


export interface MailChimpConnectorProfileProps extends ConnectorProfileProps {
    readonly apiKey: string;
    readonly instanceUrl: string;
}



/**
 * A class that represents a MailChimp Connector Profile.
 *
 */
export class MailChimpConnectorProfile extends ConnectorProfileBase {

    public static fromConnectionProfileArn(scope: Construct, id: string, arn: string) {
        return this._fromConnectorProfileAttributes(scope, id, { arn }) as MailChimpConnectorProfile;
    }
  
    public static fromConnectionProfileName(scope: Construct, id: string, name: string) {
        return this._fromConnectorProfileAttributes(scope, id, { name }) as MailChimpConnectorProfile;
    }
    
    constructor(scope: Construct, id: string, props: MailChimpConnectorProfileProps) {
        super(scope, id, props, MailChimpConnectorType.instance);
    }

  
    protected buildConnectorProfileProperties(props: ConnectorProfileProps): CfnConnectorProfile.ConnectorProfilePropertiesProperty {
        const properties = (props as MailChimpConnectorProfileProps);
        return {
            customConnector: {
                profileProperties: {
                    instanceUrl: properties.instanceUrl,
                },
            }
        };
    }
  
    protected buildConnectorProfileCredentials(props: ConnectorProfileProps): CfnConnectorProfile.ConnectorProfileCredentialsProperty {
        const properties = (props as MailChimpConnectorProfileProps);

        return {
            customConnector: {
                authenticationType: ConnectorAuthenticationType.APIKEY,
                apiKey:{
                    apiKey:properties.apiKey,
                },
            }
        };
    }
}