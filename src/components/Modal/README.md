How to use Modal component:

export const MyComponent = () => {

const [isModalWindowOpened, setIsModalWindowOpened] = useState(false); //You need to store somewhere modal state, whether it opened or closed

const openModalWindow = () => {
setIsModalWindowOpened(true);
} // You need to open it somewhere

<Modal
isOpened={isModalWindowOpened} // Property which controls whether the modal is opened or not
onClose={() => setIsModalWindowOpened(false)} //You need to pass here a function that is being called when user click on cross icon in the modal, and in there you can do whatever you want, and then you need to close it

>

    <ModalContentComponent/>

  </Modal>
}

//Hope that it helps, if not - you can always ask me (Andrii Kovtunets - YellowFlash1040)
