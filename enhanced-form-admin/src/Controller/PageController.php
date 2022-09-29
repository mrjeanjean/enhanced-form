<?php

namespace App\Controller;

use App\Repository\PostRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(PostRepository $postRepository): Response
    {
        $page = $postRepository->findOneBy([]);

        if(!$page){
            throw new Exception('Please create a page to see editor render in action');
        }

        $pageContent = json_decode($page->getContent());

        return $this->render('page/index.html.twig', [
            'page' => $page,
            'sections' => $pageContent
        ]);
    }
}
