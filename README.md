Proof of Concept Software for Automated Custom Wooden Furniture Manufacturing

<img src="https://i.imgur.com/4susdSP.gif" width="640">

This software was created as part of a vocational school course. The name of the course could be translated from Finnish to "Manufacturing of a carpenter's custom order product." The software can be found online at https://lasselukkari.github.io/furnigen. While the tool is fully functional, it should be considered an early prototype. The code quality isn't up to standards, and it does not follow best practices in general.

The goal of this proof of concept software is to explore the potential for automating the production of custom wooden furniture. By leveraging the capabilities of a 5-axis CNC machine, the software aims to streamline the manufacturing process and enhance efficiency in creating bespoke furniture pieces.

A 5-axis CNC machine is a technologically advanced tool that enables precise and intricate woodworking operations. It has a rich history, evolving from the early development of Computer Numerical Control (CNC) machines. The introduction of 5-axis machines expanded the possibilities for woodworking, allowing for complex operations with exceptional accuracy.
<img src="https://i.imgur.com/DFesBcq.png" width="100%"> <br>
> *Biesse Rover A 5-axis CNC machine*

The benefits of automating custom furniture manufacturing are numerous. Customers can enjoy furniture pieces that are tailored to their specific requirements and preferences, adding a personal touch to their living spaces. This customization opens up opportunities for creativity and individuality in design.

The software itself enables users to create a 3D model of a wooden kitchen table by defining key dimensions. This user-friendly interface allows for easy customization, empowering individuals to design their ideal table. Once the dimensions are specified, the software generates CNC programs for all the necessary components, including the tabletop, legs, aprons, corner supports and tabletop attachments.

The software adheres to traditional woodworking best practices, employing time-tested wood joints for structural integrity and durability. By incorporating these tried-and-true techniques, the software ensures the production of high-quality furniture pieces.

Developed using the JavaScript programming language, the software operates entirely within a web browser, providing a convenient and accessible platform. The user interface is designed with simplicity in mind, utilizing React and three.js for intuitive navigation and visualization of the 3D model.

Upon completion, the software generates CNC programs in a proprietary file format known as .CIX. This format is specifically designed for CNC machines manufactured by Biesse, ensuring compatibility between the software and the manufacturing equipment. The CNC programs serve as detailed instructions for the CNC machine, guiding it through precise cutting and shaping operations for each wooden component.

While the software's focus is on custom kitchen tables, its potential extends to other furniture items such as kitchen cupboards, bookshelves, and loudspeaker enclosures. This opens up possibilities for diverse and customizable furniture manufacturing.

In terms of business models, various options can be explored. Direct sales to end-users provide customers with the opportunity to order custom furniture directly through the software platform. The software could also be licensed to other companies interested in integrating automated manufacturing processes into their operations. Another potential model involves establishing a network of approved manufacturers who pay a share to utilize the software and offer custom furniture manufacturing services.

During development, a key aspect was creating a parser for existing .CIX files, allowing for seamless integration and customization. These files were converted into JavaScript code, and templates were parametrized to incorporate dimensions from the user-defined 3D model. Key dimensions such as leg height, table width, table length, tabletop thickness, leg width, leg margin, and apron height were accurately integrated into the parametrized templates.

In conclusion, this proof of concept software represents a step toward automating custom wooden furniture manufacturing. By utilizing 5-axis CNC technology, adhering to traditional woodworking practices, and providing a user-friendly browser-based interface, the software demonstrates the potential for efficient and personalized furniture production.

## Example table project
<img src="https://i.imgur.com/oTpiixk.png" width="640">
<img src="https://i.imgur.com/YxWXn1i.png" width="640">

<img src="https://i.imgur.com/vsNv0lu.png" width="640">
<img src="https://i.imgur.com/la3Xexs.png" width="640">

