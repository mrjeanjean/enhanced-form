<?php

namespace App\Controller\Admin;

use App\Entity\Post;
use App\Field\EnhancedFormField;
use App\Form\EnhancedFormType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PostCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Post::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title'),
            EnhancedFormField::new('content')->hideOnIndex()->hideOnDetail(),
//            TextareaField::new('content'),
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setFormThemes(['admin/field/enhanced-form.html.twig', '@EasyAdmin/crud/form_theme.html.twig']);
    }
}
