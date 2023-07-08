import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSubmarine } from 'apiSdk/submarines';
import { Error } from 'components/error';
import { submarineValidationSchema } from 'validationSchema/submarines';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { SubmarineInterface } from 'interfaces/submarine';

function SubmarineCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SubmarineInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSubmarine(values);
      resetForm();
      router.push('/submarines');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SubmarineInterface>({
    initialValues: {
      depth: 0,
      buoyancy: 0,
      movement: 0,
      atmosphere_pressure: 0,
      blending: 0,
      winch: 0,
      ballast: 0,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: submarineValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Submarine
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="depth" mb="4" isInvalid={!!formik.errors?.depth}>
            <FormLabel>Depth</FormLabel>
            <NumberInput
              name="depth"
              value={formik.values?.depth}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('depth', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.depth && <FormErrorMessage>{formik.errors?.depth}</FormErrorMessage>}
          </FormControl>
          <FormControl id="buoyancy" mb="4" isInvalid={!!formik.errors?.buoyancy}>
            <FormLabel>Buoyancy</FormLabel>
            <NumberInput
              name="buoyancy"
              value={formik.values?.buoyancy}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('buoyancy', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.buoyancy && <FormErrorMessage>{formik.errors?.buoyancy}</FormErrorMessage>}
          </FormControl>
          <FormControl id="movement" mb="4" isInvalid={!!formik.errors?.movement}>
            <FormLabel>Movement</FormLabel>
            <NumberInput
              name="movement"
              value={formik.values?.movement}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('movement', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.movement && <FormErrorMessage>{formik.errors?.movement}</FormErrorMessage>}
          </FormControl>
          <FormControl id="atmosphere_pressure" mb="4" isInvalid={!!formik.errors?.atmosphere_pressure}>
            <FormLabel>Atmosphere Pressure</FormLabel>
            <NumberInput
              name="atmosphere_pressure"
              value={formik.values?.atmosphere_pressure}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('atmosphere_pressure', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.atmosphere_pressure && (
              <FormErrorMessage>{formik.errors?.atmosphere_pressure}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="blending" mb="4" isInvalid={!!formik.errors?.blending}>
            <FormLabel>Blending</FormLabel>
            <NumberInput
              name="blending"
              value={formik.values?.blending}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('blending', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.blending && <FormErrorMessage>{formik.errors?.blending}</FormErrorMessage>}
          </FormControl>
          <FormControl id="winch" mb="4" isInvalid={!!formik.errors?.winch}>
            <FormLabel>Winch</FormLabel>
            <NumberInput
              name="winch"
              value={formik.values?.winch}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('winch', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.winch && <FormErrorMessage>{formik.errors?.winch}</FormErrorMessage>}
          </FormControl>
          <FormControl id="ballast" mb="4" isInvalid={!!formik.errors?.ballast}>
            <FormLabel>Ballast</FormLabel>
            <NumberInput
              name="ballast"
              value={formik.values?.ballast}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('ballast', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.ballast && <FormErrorMessage>{formik.errors?.ballast}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'submarine',
    operation: AccessOperationEnum.CREATE,
  }),
)(SubmarineCreatePage);
