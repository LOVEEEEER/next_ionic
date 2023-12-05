import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { IonList, IonIcon, IonInput, IonButton, IonText } from '@ionic/react';
import { addCircle, cloudUpload } from 'ionicons/icons';
import useForm from '../../../hooks/useForm';
import { createProduct } from '../../../store/products/productsActions';
import { validatorConfig } from './validatorConfig';

const formFields = [
  {
    type: 'text',
    name: 'title',
    label: 'Name...',
    maxLength: 20,
  },
  {
    type: 'text',
    name: 'description',
    label: 'Description...',
    maxLength: 100,
  },
  {
    type: 'number',
    name: 'price',
    label: 'Price...',
    maxLength: 10,
  },
];

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { data, handleChange, clearForm, errors, validate } = useForm(
    {
      title: '',
      description: '',
      price: '',
      image: '',
    },
    validatorConfig
  );

  const handleFile = async event => {
    const file = event.target.files[0];

    if (file) {
      const fakeEvent = {
        target: {
          name: 'image',
          value: [file.name, file],
        },
      };

      handleChange(fakeEvent);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validate();
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      try {
        async function uploadImage(img) {
          let body = new FormData();
          body.set('key', process.env.IMGBB_TOKEN);
          body.append('image', img);

          return axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body,
          });
        }
        const { data: imageData } = await uploadImage(data.image[1]);
        const productId = nanoid();

        if (isValid) {
          dispatch(
            createProduct({
              id: productId,
              product: { ...data, image: imageData.data.display_url, id: productId },
              clearForm,
            })
          );
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="mx-4 mt-14">
      <form onSubmit={handleSubmit}>
        <IonList>
          {formFields.map(field => {
            return (
              <div key={field.name + '_' + field.label}>
                <IonInput
                  label={field.label}
                  labelPlacement="floating"
                  counter={true}
                  type={field.type}
                  maxlength={field.maxLength}
                  name={field.name}
                  value={data[field.name]}
                  onIonChange={handleChange}
                />
                <IonText color="danger">{errors[field.name]}</IonText>
              </div>
            );
          })}
          <div className="flex flex-col text-center mt-2 mb-2">
            <label
              htmlFor="addcsv"
              className="flex gap-2 bg-blue-500 rounded-xl cursor-pointer p-4 items-center justify-center"
            >
              <IonIcon slot="start" icon={cloudUpload} />
              Upload image
            </label>
            {data.image && <IonText>{data.image[0]}</IonText>}
          </div>
          <input
            type="file"
            name="image"
            id="addcsv"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={e => handleFile(e)}
          />
          <IonText color="danger">{errors.image}</IonText>
        </IonList>
        <IonButton type="submit">
          <IonIcon slot="end" icon={addCircle}></IonIcon> Create
        </IonButton>
      </form>
    </div>
  );
};

export default CreateProduct;
