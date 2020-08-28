/** EQUINIX MESSAGING GATEWAY SMARTHANDS TEMPLATE **/

/*************************************************************************
* 
 * EQUINIX CONFIDENTIAL
* __________________
* 
 *  © 2020 Equinix, Inc. All rights reserved.
* 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
* Terms of Use: https://www.equinix.com/company/legal/terms/
*
*************************************************************************/

const messageUtil = require('./util/MessageUtil');

/**
  * Sends the given create SmartHands message to Equinix Incoming Queue.
  *
  * @param requestJSON - Message to send.
  * @param clientID - Equinix issued clientID.
  * @param clientSecret - Equinix issued clientSecret.
  * @returns serviceBusResponse - Received response message
  * @throws error if the service returns an error while processing message.
  */
const createSmartHands = async (requestJSON, clientID, clientSecret) => {
    var JSONObj = JSON.parse(requestJSON);
    var serviceBusResponse = await messageUtil.messageProcessor(JSONObj, "Create", "SmartHands", clientID, clientSecret);
    return serviceBusResponse;
}

/**
  * Sends the given update SmartHands message to Equinix Incoming Queue.
  *
  * @param requestJSON - Message to send.
  * @param clientID - Equinix issued clientID.
  * @param clientSecret - Equinix issued clientSecret.
  * @returns serviceBusResponse - Received response message
  * @throws error if the service returns an error while processing message.
  */
const updateSmartHands = async (requestJSON, clientID, clientSecret) => {
    var JSONObj = JSON.parse(requestJSON);
    var serviceBusResponse = await messageUtil.messageProcessor(JSONObj, "Update", "SmartHands", clientID, clientSecret);
    return serviceBusResponse;
}

/**
  * Sends the given cancel SmartHands message to Equinix Incoming Queue.
  *
  * @param requestJSON - Message to send.
  * @param clientID - Equinix issued clientID.
  * @param clientSecret - Equinix issued clientSecret.
  * @returns serviceBusResponse - Received response message
  * @throws error if the service returns an error while processing message.
  */
const cancelSmartHands = async (requestJSON, clientID, clientSecret) => {
    var JSONObj = JSON.parse(requestJSON);
    var serviceBusResponse = await messageUtil.messageProcessor(JSONObj, "Cancelled", "SmartHands", clientID, clientSecret);
    return serviceBusResponse;
}

/**
  * Receive SmartHands notification that matches the filter criteria from Equinix Outgoing Queue.
  *
  * @param customerReferenceNumber - Customer Reference Number used for searching SmartHands order
  * @param servicerId - Order Number used for searching SmartHands order
  * @param activityId - Activity ID used for searching SmartHands Activity
  * @param state - SmartHands order state (eg: Open, InProgress, Pending Customer Input, Cancelled, Closed) 
  * @returns queueMsg - Received response message
  * @throws error if the service returns an error while retrieving notification.
  */
const getNotifications = async (customerReferenceNumber, servicerId, activityId, state) => {
    var filterCriteria = {
        ResourceType: 'SmartHands',
        RequestorId: customerReferenceNumber,
        ServicerId: servicerId,
        Activity: activityId,
        State: state
    };

    var queueMsg = await messageUtil.readFromQueue(null, filterCriteria);
    return queueMsg;
}


module.exports = {
    createSmartHands: createSmartHands,
    updateSmartHands: updateSmartHands,
    cancelSmartHands: cancelSmartHands,
    getNotifications: getNotifications
}