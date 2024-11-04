import React from 'react';
import PollManager from './CommunityAdminTabs/PollAdminController';
import CommunityMilestoneManager from './CommunityAdminTabs/CommunityMilestonesController';
import ForumManager from './CommunityAdminTabs/ForumAdminController';
 


export default function CommunityAdmin() {

    return (
        <>
        
        <h1>Community Page Admin</h1>
        
            {/* Add, Update, and Delete Polls*/}
            {PollManager()}
            {ForumManager()}
            {CommunityMilestoneManager()}

        
        
        </>
        
    );



    
    
    {/* {CommunityMilestoneManager()} */}

    // Add, Update, and Delete Top Posts

    
    // Add, Update, and Delete Community Milestones
}