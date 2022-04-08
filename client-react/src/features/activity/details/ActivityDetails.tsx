import {Card, Button, Image} from "semantic-ui-react";
import {Activity} from "../../../models/Activity";

interface Props {
    activity: Activity | undefined;
    onCancelActivity: () => void;
    onOpenForm: (id: string) => void;
}

const ActivityDetails = ({activity, onCancelActivity, onOpenForm}: Props) => {
    if (!activity) {
        return null;
    }
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => onOpenForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={onCancelActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    );

}

export default ActivityDetails;