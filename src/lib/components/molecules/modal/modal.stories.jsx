import { Modal } from "."
import { action } from "@storybook/addon-actions"

const meta = {
  title: "Molecules/Modal",
  component: Modal,
  args: {
    visible: true,
    onClickOutside: action("clicked outside"),
  },
  render: (args) => {
    return (
      <div>
        <p>
          Sociosqu scelerisque sed sed duis? Vehicula risus suspendisse mauris
          vulputate ipsum nibh, turpis dignissim per cubilia commodo. Himenaeos
          in rhoncus taciti quam sed taciti inceptos luctus netus viverra. Nisl
          consectetur laoreet tellus tristique non nostra inceptos mollis,
          praesent dui ad turpis. Montes adipiscing placerat id, vel tristique
          himenaeos ultrices euismod tincidunt! Interdum, lobortis morbi ipsum
          sed parturient. Rutrum elit nibh natoque semper parturient potenti
          odio class. Iaculis justo lacus mus lorem nunc feugiat mollis facilisi
          a. Lorem non himenaeos ultricies dolor hac? Suspendisse.
        </p>
        <p>
          Curabitur velit convallis feugiat sem sociis, sapien dis facilisi
          tellus. Odio et integer curae; nisl bibendum lectus sed lorem
          tristique et himenaeos. Primis fames magna eget varius nullam
          sollicitudin cum fermentum euismod blandit ligula. Torquent augue dui
          etiam enim, magna nunc lacus? Vel est auctor fringilla senectus odio
          tempus nunc justo. Vehicula pretium massa hac nisi.
        </p>
        <p>
          Mi quisque conubia tincidunt est dui lectus velit interdum. Quam sit
          consequat vestibulum dictumst aliquet tortor? Elit erat eros mollis
          hendrerit iaculis ultricies egestas habitant per odio adipiscing. Erat
          cubilia sapien blandit dictum purus vivamus natoque semper odio dolor
          fusce parturient. Dapibus vestibulum dictumst et sollicitudin risus
          ornare posuere montes sed. Netus dis posuere nisi proin pretium
          habitasse neque senectus primis non aliquet. Varius convallis vitae
          morbi eros lectus lectus leo. Torquent nascetur nullam interdum. Diam
          platea porttitor scelerisque dictumst lectus sed malesuada laoreet.
          Cras dictumst ornare tincidunt turpis pharetra risus sapien ornare
          erat lacus etiam?
        </p>
        <p>
          Ad purus maecenas himenaeos sem at commodo odio nulla nam tellus
          turpis. Dui molestie ligula cras hendrerit donec placerat purus.
          Rutrum nisl conubia inceptos fermentum facilisi condimentum auctor
          conubia urna? Iaculis mi parturient pharetra torquent parturient.
          Montes semper lectus mauris, molestie quis massa penatibus. Velit
          nascetur hendrerit litora elementum justo erat lorem mus habitant.
          Dictumst mollis elit platea nullam natoque commodo integer tellus.
          Vitae aenean ultricies quam. Est.
        </p>
        <p>
          Donec et porta nostra semper pellentesque integer. Nec nullam, sapien
          consectetur maecenas tincidunt. Dolor interdum tellus justo torquent
          faucibus diam mattis inceptos. Nisl enim aliquet in per risus primis
          scelerisque lectus magna odio duis. Est turpis sapien aptent volutpat
          ullamcorper. Inceptos; ornare ullamcorper euismod iaculis mi faucibus
          viverra turpis porttitor proin. Placerat odio taciti himenaeos
          suscipit, praesent interdum interdum arcu dolor blandit vehicula.
        </p>
        <Modal {...args}>
          <div style={{ height: "200px", backgroundColor: "floralwhite" }} />
        </Modal>
      </div>
    )
  },
}

export default meta

export const Default = {}
