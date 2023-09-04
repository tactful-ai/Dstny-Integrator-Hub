import AuthTestRequesForm from "components/AuthTestRequestForm";
import CustomAccordion from "components/CustomAccordion"
import TagNumber from "components/TagNumber"
import WrappingBox from "components/WrappingBox"
import type { header } from "pages/NewIntegrationAuthAPIKey"

type AuthSecondStepProps = {
    headers: header[];
    endpoint: string;
    setEndpoint: (value: string) => void;
    setHeaders: (value: header[] | ((prevValue: header[]) => header[])) => void;
};



function AuthSecondStep({headers, setHeaders, endpoint, setEndpoint}:AuthSecondStepProps) {
    return (
        <CustomAccordion tag={<TagNumber text="Step 2" />} heading="Configure a Test Request">

            <WrappingBox>
                Add a simple API endpoint to test user credentials. Also provide the required headers for this endpoint.
            </WrappingBox>

            <AuthTestRequesForm setEndPoint={setEndpoint} setHeaders={setHeaders}/>
        </CustomAccordion>
    )
}

export default AuthSecondStep