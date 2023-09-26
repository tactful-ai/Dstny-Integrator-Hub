import { AuthStepsProps } from "@automatisch/types";
import AuthTestRequesForm from "components/AuthTestRequestForm";
import CustomAccordion from "components/CustomAccordion"


function AuthSecondStep({ control, register, errors }: AuthStepsProps) {

    return (
        <CustomAccordion tag={<div className='tag-number'>Step 2</div>} heading="Configure a Test Request">

            <div className='wrapping-box'>
                Add a simple API endpoint to test user credentials. Also provide the required headers for this endpoint.
            </div>

            <AuthTestRequesForm control={control} register={register} errors={errors} />
        </CustomAccordion>
    )
}

export default AuthSecondStep